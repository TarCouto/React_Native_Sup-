export class AppError {
  message: string;

  constructor(message: string = "Ocorreu um erro desconhecido") {
    this.message = message;
  }
}
