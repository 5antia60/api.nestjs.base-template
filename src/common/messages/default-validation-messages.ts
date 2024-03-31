/**
 * Mensagens de retorno para validações
 */
export const DefaultValidationMessages = {

  IsBoolean: (field: string) => `${ field }: É necessário enviar um valor booleano válido.`,

  IsArray: (field: string) => `${ field }: É necessário enviar um array válido!`,

  IsNumber: (field: string) => `${ field }: É necessário enviar um número.`,

  IsString: (field: string) => `${ field }: É necessário enviar um texto válido.`,

  IsUrl: (field: string) => `${ field }: É necessário enviar um url válido!`,

  IsEmail: (field: string) => `${ field }: É necessário enviar um e-mail válido`,

  IsNotEmpty: (field: string) => `${ field }: Não é permitido enviar um texto em branco.`,

  MaxLength: (field: string, limitLabel: number) => `${ field }: O limite de caracteres é ${ limitLabel }`,

  IsEnum: (field: string, enumLabel: string) => (
    `${ field }: É necessário enviar um enum válido - ${ enumLabel }`
  ),

};
