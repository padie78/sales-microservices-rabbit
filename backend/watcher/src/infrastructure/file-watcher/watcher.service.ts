import { Injectable, OnModuleInit, Logger, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as chokidar from 'chokidar';
import * as fs from 'fs/promises';
import * as path from 'path';
import { IHandleAssetUploadUseCase } from '../../domain/interfaces/use-cases/handle-asset-upload.usecase.interface';
import { IAssetCreateDTO } from '../../domain/interfaces/dto/create/asset.create.dto.interface';


@Injectable()
export class FileWatcherService implements OnModuleInit {
  private readonly logger = new Logger(FileWatcherService.name);
  private readonly watchPath: string;
  
  constructor(
    private readonly configService: ConfigService,
    @Inject('IHandleAssetUploadUseCase') 
    private readonly handleAssetUploadUseCase: IHandleAssetUploadUseCase
  ) {
      this.watchPath = this.configService.get<string>('WATCH_PATH');
  }

  /**
   * Initializes the file watcher when the module starts.
   */
  onModuleInit() {
    console.log(`Watcher initiated: Listening for files in ${this.watchPath}`);

    const watcher = chokidar.watch(this.watchPath, {
      persistent: true,
      ignoreInitial: true,
      usePolling: true,
      awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100
      }
    });

    // Event listener for new files added to the directory
    watcher.on('add', async (filePath: string) => {
      await this.handleFileAddition(filePath);
    });
  }

  /**
   * Handles the processing logic when a new file is detected.
   * @param filePath Path of the newly added file
   */
  private async handleFileAddition(filePath: string) {
    try {
      this.logger.log(`New file detected: ${filePath}`);

      // Read file content from disk
      const rawData = await fs.readFile(filePath, 'utf8');
      
      // Parse JSON data based on the Create DTO interface
      const jsonData: IAssetCreateDTO = JSON.parse(rawData);

      // Extract metadata for the processing context
      const fileContext = {
        filename: path.basename(filePath),
        fullPath: path.resolve(filePath)
      };

      // Delegate the business logic to the Use Case
      await this.handleAssetUploadUseCase.execute(jsonData, fileContext);
      this.logger.log(`File processed successfully: ${fileContext.filename}`);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to process file ${filePath}: ${errorMessage}`);
    }
  }
}