import { Injectable } from '@nestjs/common';
import { Employee } from '../../models/employee.model';
import * as fs from 'fs';

@Injectable()
export class EmployeesService {
  private employees: Employee[] = []; // Aquí puedes almacenar los empleados en memoria o conectar a una base de datos

  getEmployees(): Employee[] {
    return this.employees;
  }

  createEmployee(employee: Employee): Employee {
    this.employees.push(employee);
    return employee;
  }

  private filePath = 'src/database/db.json';

  async leerArchivo(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      fs.readFile(this.filePath, 'utf-8', (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data as string);
        }
      });
    });
  }
}
