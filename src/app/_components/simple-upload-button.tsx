"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useUploadThing } from "~/utils/uploadthing";
import { toast } from "sonner";

type Input = Parameters<typeof useUploadThing>;

const UserUploadThingInputProps = (...args: Input) => {
    const $ut = useUploadThing(...args);
    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return;
        const selectedFiles = Array.from(e.target.files);
        const result = await $ut.startUpload(selectedFiles);
        console.log("uploaded files",result);
    };
    return {
        inputProps: {
            onChange,
            multiple: (($ut as any).permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
            accept: "image/*",
        },
        isUploading: $ut.isUploading,
    };
};

function UploadSVG() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
        />
      </svg>
    );
  }

export function SimpleUploadButton() {

    const router = useRouter();

    const { inputProps } = UserUploadThingInputProps("imageUploader", {
        onUploadBegin(){
            toast("Uploading...", {
                duration: 10000,
                id: "upload-begin",
            });
        },
        onClientUploadComplete(res){
            toast.dismiss("upload-begin");
            toast("Upload Complete!", {
                duration: 1000,
            });
            router.refresh();
            console.log("Client Upload Complete",res);
        },
    });


    return (
        <div>
            <label htmlFor="upload-button" className="cursor-pointer">
                <UploadSVG />
            </label>
            <input id="upload-button" type="file" className="sr-only" {...inputProps} />
        </div>
    );
};
