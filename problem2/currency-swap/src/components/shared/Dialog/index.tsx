import React from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface CustomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  success: boolean;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  isOpen,
  onClose,
  message,
  success,
}) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={onClose}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle as="h3" className={`text-base/7 font-medium ${success ? 'text-green-600' : 'text-red-600'}`}>
              {success ? 'Success' : 'Error'}
            </DialogTitle>
            <p className="mt-2 text-sm/6 ">
              {message}
            </p>
            <div className="mt-4">
              <Button
                className=""
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default CustomDialog;
