import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class DBService {
  private data: any[];

  constructor() {
    this.data = this.readData();
  }

  private readData(): any[] {
    try {
      const data = fs.readFileSync('db.json', 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  private saveData(data: any[]): void {
    fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
  }

  getAll(): any[] {
    return this.data;
  }

  getById(id: string): any | undefined {
    return this.data.find((item: any) => item.id === id);
  }

  create(item: any): void {
    this.data.push(item);
    this.saveData(this.data);
  }

  update(id: string, updatedItem: any): void {
    const index = this.data.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...updatedItem };
      this.saveData(this.data);
    }
  }

  delete(id: string): void {
    const index = this.data.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.saveData(this.data);
    }
  }
}
