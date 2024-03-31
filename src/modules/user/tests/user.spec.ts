//#region Imports

import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

//#endregion

const mockUserModel = {
  create: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  updateOne: jest.fn(),
  deleteOne: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: getModelToken('User'), useValue: mockUserModel },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('signUp', () => {
    it('should sign up a new user and return a token', async () => {
      const signUpDto: SignUpDto = { name: 'John Doe', email: 'john@example.com', password: 'password' };
      const token = 'generated-token';

      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed-password');
      mockUserModel.create.mockResolvedValue({ _id: 'user-id' });
      mockJwtService.sign.mockReturnValue(token);

      const result = await controller.signUp(signUpDto);

      expect(result).toEqual({ token });
      expect(mockUserModel.create).toHaveBeenCalledWith({
        name: signUpDto.name,
        email: signUpDto.email,
        password: 'hashed-password',
      });
      expect(mockJwtService.sign).toHaveBeenCalledWith({ id: 'user-id' });
    });
  });

  describe('login', () => {
    it('should login a user and return user information and token', async () => {
      const loginDto: LoginDto = { email: 'john@example.com', password: 'password' };
      const user = {
        _id: 'user-id',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
        cnpj: '0',
        empresa: 'Facens',
        cidade: 'Sorocaba',
        bairro: 'Mangal',
        cep: '999999',
        numero: '232',
        complemento: '-',
        celular: '98888-8888',
        endereco: 'Rua Augusta',
        uf: 'SP',
        id: 0,
      };
      const token = 'generated-token';

      mockUserModel.findOne.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue(token);

      const result = await controller.login(loginDto);

      expect(result).toEqual({ user, token });
      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: loginDto.email });
      expect(mockJwtService.sign).toHaveBeenCalledWith({ id: 'user-id' });
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      const loginDto: LoginDto = { email: 'john@example.com', password: 'wrong-password' };

      mockUserModel.findOne.mockResolvedValue(null);

      await expect(controller.login(loginDto)).rejects.toThrowError(UnauthorizedException);
      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: loginDto.email });
    });
  });

});
