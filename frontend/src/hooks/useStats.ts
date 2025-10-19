import { useState, useEffect } from "react";
import { UserStats } from "../types";
import { api } from "../api";

export const useStats = () => {
  const [stats, setStats] = useState<UserStats[]>([]);
  const [loadingStats, setLoadingStats] = useState<boolean>(true);

  const loadStats = async () => {
    setLoadingStats(true);
    try {
      const data = await api.getUserStats();
      setStats(data);
    } catch (err) {
      console.error("Failed to load stats:", err);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return { stats, loadStats, loadingStats };
};
