import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";
import { useClickStore } from "../store/store";
import axios from "axios";
import toast from "react-hot-toast";

const useFollow = (userId: string) => {
  const { currentUser, mutate: currentUserMutate } = useCurrentUser();
  const { data: fetchUser, mutate: fetchUserMutate } = useUser(userId);
  const { toggle } = useClickStore();

  const isFollowing = useCallback(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [userId, currentUser]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return toggle();
    }

    try {
      if (isFollowing()) {
        await axios.delete("/api/follow", { data: { userId } });
      } else {
        await axios.post("/api/follow", { userId });
      }

      currentUserMutate();
      fetchUserMutate();

      toast.success("Success");
    } catch (error) {
      toast.error("Somoething went wrong");
    }
  }, [
    currentUserMutate,
    fetchUserMutate,
    toggle,
    userId,
    currentUser,
    isFollowing,
  ]);

  return {
    toggleFollow,
    isFollowing,
  };
};

export default useFollow;
