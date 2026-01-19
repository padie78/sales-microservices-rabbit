import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileStorageService {
  private readonly logger = new Logger(FileStorageService.name);

  /**
   * Reads the content of a file from the local file system
   * @param filePath - Absolute or relative path to the target file
   * @returns The file content as a UTF-8 string
   * @throws Error if the file does not exist
   */
  readFile(filePath: string): string {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found at: ${filePath}`);
    }
    return fs.readFileSync(filePath, 'utf8');
  }

  /**
   * Moves a file to a date-structured directory (YYYY/MM/DD)
   * @param currentPath - Current full path of the file
   * @param filename - Name of the file including extension
   * @param baseRoot - Root directory where the file should be moved
   * @returns The new destination path
   */
  moveFileToFolder(currentPath: string, filename: string, baseRoot: string): string {
    const now = new Date();
    
    // Generate a structured path based on the current date: base/YYYY/MM/DD
    const datePath = path.join(
      baseRoot,
      now.getFullYear().toString(),
      (now.getMonth() + 1).toString().padStart(2, '0'),
      now.getDate().toString().padStart(2, '0')
    );

    const destinationPath = path.join(datePath, filename);

    // Ensure the nested directory structure exists before moving
    if (!fs.existsSync(datePath)) {
      fs.mkdirSync(datePath, { recursive: true });
    }

    // Perform the move operation (atomic rename)
    if (fs.existsSync(currentPath)) {
      fs.renameSync(currentPath, destinationPath);
      this.logger.log(`📂 Archivo movido a: ${destinationPath}`);
      return destinationPath;
    }    
    throw new Error(`Move failed: source file does not exist at ${currentPath}`);  }
}