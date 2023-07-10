import { Controller, Get } from '@nestjs/common';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  async getAllEmployees() {
    try {
      // Leer el contenido del archivo
      const fileData = await this.employeesService.leerArchivo();

      // Analizar el contenido como JSON
      const jsonData = JSON.parse(fileData);

      // Hacer algo con los datos leídos
      return jsonData;
    } catch (error) {
      // Manejar el error adecuadamente
    }
  }
}
