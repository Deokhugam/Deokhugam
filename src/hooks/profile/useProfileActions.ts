import { authApi, deleteUser, patchUserProfile } from "@/api/auth";
import { useAuthStore } from "@/store/authStore";
import { useTooltipStore } from "@/store/tooltipStore";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

export const useProfileActions = (
  userId: string,
  setUserNickname: Dispatch<SetStateAction<string>>,
  profileMenuController: Dispatch<SetStateAction<boolean>>,
  close: () => void
) => {
  const [nicknameValue, setNicknameValue] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [actionType, setActionType] = useState<
    "updateProfile" | "deleteUser"
  >();

  const router = useRouter();
  const logout = useAuthStore(state => state.logout);
  const showTooltip = useTooltipStore(state => state.showTooltip);

  const handleUpdateProfile = async () => {
    setSubmitLoading(true);
    try {
      await patchUserProfile(userId, nicknameValue);
      const updatedProfile = await authApi.getUserProfile(userId);

      setUserNickname(updatedProfile.nickname);

      close();
      profileMenuController(false);
      showTooltip("프로필 수정이 완료되었습니다!");
    } catch (error) {
      console.error("닉네임 변경 실패:", error);
    } finally {
      setSubmitLoading(false);
    }
  };
  const handleDeleteUser = async () => {
    setSubmitLoading(true);
    try {
      await deleteUser(userId);

      close();
      profileMenuController(false);
      logout();
      router.push("/auth/login");
      showTooltip("탈퇴가 완료되었습니다!");
    } catch (error) {
      console.error("회원 탈퇴 실패:", error);
    }
  };

  return {
    logout,
    nicknameValue,
    setNicknameValue,
    actionType,
    setActionType,
    submitLoading,
    handleUpdateProfile,
    handleDeleteUser
  };
};
