import { useState, useEffect } from "react";
import { User, CreateUserData } from "../types";
import { api } from "../api";
import { verifySignature } from "../utils/crypto";
import { showToast } from "../components/Toast";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [verifiedUsers, setVerifiedUsers] = useState<User[]>([]);
  const [publicKey, setPublicKey] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [protobufUsers, keyData] = await Promise.all([
          api.exportUsersProtobuf(),
          api.getPublicKey(),
        ]);
        setUsers(protobufUsers);
        setPublicKey(keyData);

        const verified = await verifyUsers(protobufUsers, keyData);
        setVerifiedUsers(verified);
      } catch (err) {
        console.error("Failed to load users:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const verifyUsers = async (list: User[], key: string): Promise<User[]> => {
    const verified: User[] = [];
    for (const u of list) {
      if (u.emailHash && u.signature) {
        const valid = await verifySignature(u.emailHash, u.signature, key);
        if (valid) verified.push(u);
      }
    }
    return verified;
  };

  const reloadUsers = async () => {
    const protobufUsers = await api.exportUsersProtobuf();
    setUsers(protobufUsers);
    const verified = await verifyUsers(protobufUsers, publicKey);
    setVerifiedUsers(verified);
  };

  const createUser = async (data: CreateUserData) => {
    try {
      const res = await api.createUser(data);
      showToast.success(res.message);
      await reloadUsers();
    } catch (err: any) {
      showToast.error(err.response?.data?.error || "Failed to create user");
    }
  };

  const updateUser = async (id: string, data: CreateUserData) => {
    try {
      const res = await api.updateUser(id, data);
      showToast.success(res.message);
      await reloadUsers();
    } catch (err: any) {
      showToast.error(err.response?.data?.error || "Failed to update user");
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const res = await api.deleteUser(id);
      showToast.success(res.data.message);
      await reloadUsers();
    } catch (err: any) {
      showToast.error(err.response?.data?.error || "Failed to delete user");
    }
  };

  return {
    users,
    verifiedUsers,
    createUser,
    updateUser,
    deleteUser,
    reloadUsers,
    loading,
  };
};
