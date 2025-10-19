import axios from "axios";
import protobuf from "protobufjs";
import { User, UserStats, CreateUserData } from "./types";

const API_BASE_URL = "http://localhost:3001/api";
let UserListType: protobuf.Type | null = null;

const initializeProtobuf = async (): Promise<protobuf.Type> => {
  if (!UserListType) {
    const root = await protobuf.load("/user.proto");
    UserListType = root.lookupType("UserList");
  }
  return UserListType;
};

export const decodeProtobufUsers = async (
  buffer: ArrayBuffer
): Promise<User[]> => {
  const UserList = await initializeProtobuf();
  const uint8Array = new Uint8Array(buffer);
  const message = UserList.decode(uint8Array);
  const plainObject = UserList.toObject(message, {
    longs: String,
    enums: String,
    bytes: String,
    // defaults: true,
  });
  return plainObject.users || [];
};

export const api = {
  createUser: (data: CreateUserData) =>
    axios.post(`${API_BASE_URL}/users`, data).then((r) => r.data),

  updateUser: (id: string, data: Partial<CreateUserData>) =>
    axios.put(`${API_BASE_URL}/users/${id}`, data).then((r) => r.data),

  deleteUser: (id: string) => axios.delete(`${API_BASE_URL}/users/${id}`),

  getUserStats: (): Promise<UserStats[]> =>
    axios.get(`${API_BASE_URL}/users/stats`).then((r) => r.data),

  getPublicKey: (): Promise<string> =>
    axios.get(`${API_BASE_URL}/public-key`).then((r) => r.data),

  exportUsersProtobuf: async (): Promise<User[]> => {
    const response = await axios.get(`${API_BASE_URL}/users/export`, {
      responseType: "arraybuffer",
    });
    return await decodeProtobufUsers(response.data);
  },
};
