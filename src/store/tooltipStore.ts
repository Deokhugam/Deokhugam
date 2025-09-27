import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TooltipState {
  isVisible: boolean;
  content: string;
  icon?: string;
  showTooltip: (content: string, icon?: string) => void;
  hideTooltip: () => void;
}

let tooltipTimeout: NodeJS.Timeout;

export const useTooltipStore = create<TooltipState>()(
  persist(
    set => ({
      isVisible: false,
      content: "",
      icon: undefined,

      showTooltip: (content, icon, duration = 3000) => {
        set({ isVisible: true, content, icon });

        if (tooltipTimeout) clearTimeout(tooltipTimeout);

        tooltipTimeout = setTimeout(() => {
          set({ isVisible: false });
        }, duration);
      },
      hideTooltip: () => set({ isVisible: false })
    }),
    {
      name: "tooltip-storage",
      partialize: state => ({ isVisible: state.isVisible })
    }
  )
);
