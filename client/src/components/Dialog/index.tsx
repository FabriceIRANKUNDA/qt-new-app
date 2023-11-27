import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import clsx from "clsx";
import { FunctionComponent } from "react";

type MagickDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  description?: string;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  submitText?: string;
  hideButton?: boolean;
  onSubmit?: () => void;
  destructive?: boolean;
  submitDisabled?: boolean;
  isLoading?: boolean;
  submitButton?: boolean;
};

const MagickDialog: FunctionComponent<MagickDialogProps> = ({
  open,
  setOpen,
  title,
  description,
  trigger,
  children,
  hideButton = false,
  submitText = "Save changes",
  onSubmit = () => {},
  destructive = false,
  submitDisabled = false,
  isLoading = false,
  submitButton = true,
}) => {
  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setOpen(false);
        }
      }}
      open={open}
    >
      {!hideButton && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="w-full text-black dark:text-white rounded dark:bg-[#262B2E] bg-[#E9EDF1]">
        <DialogHeader>
          <DialogTitle className="py-4 text-center font-montserrat">
            {title}
          </DialogTitle>
          <DialogDescription
            className={clsx(
              destructive ? "text-red-500" : "text-black dark:text-white",
              "text-center font-montserrat font-medium"
            )}
          >
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{children}</div>
        <DialogFooter className="mx-auto">
          {submitButton && (
            <Button
              className=" text-[#fff] font-bold min-w-[200px]"
              onClick={onSubmit}
              disabled={submitDisabled}
            >
              {submitText}
              {isLoading && (
                <div
                  className="inline-block ml-4 h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent align-[-0.125em] text-info motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                />
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MagickDialog;
