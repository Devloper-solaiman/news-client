import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalHeader,
} from "@nextui-org/modal";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { IoIosImages } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaUser } from "react-icons/fa";

import GlassLoader from "@/src/components/shared/glassLoader";
import { useUpdateMyProfileMutation } from "@/src/redux/features/user/userApi";

interface CloudinaryResponse {
  secure_url: string;
}

interface UpdateUserModalProps {
  defaultName: string;
  defaultImage: string | undefined;
  userId: string;
  bio: string;
  country: string;
  address: string;
}

interface FormInputs {
  name: string;
  imageFile: File | null;
  bio: string;
  country: string;
  address: string;
}

export default function UpdateUserModal({
  defaultName,
  defaultImage,
  country,
  bio,
  address,
  userId,
}: UpdateUserModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [image, setImage] = useState<string>(defaultImage || "");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [updateMyProfileFn, { isLoading }] = useUpdateMyProfileMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<FormInputs>({
    defaultValues: {
      name: defaultName,
      imageFile: null,
      bio: bio || "",
      country: country || "",
      address: address || "",
    },
  });

  // Use effect to set default values when modal opens
  useEffect(() => {
    if (isOpen) {
      reset({
        name: defaultName,
        imageFile: null,
        bio,
        country,
        address,
      });
      setImage(defaultImage || "");
    }
  }, [isOpen, defaultName, defaultImage, bio, country, address, reset]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];

    if (file) {
      setValue("imageFile", file);
      setImage(URL.createObjectURL(file));
    }
  };

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    setIsUploading(true);
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "travel-tips");
    formData.append("cloud_name", "Travel-tips&-destination-guides-images");

    const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;

    try {
      const res = await fetch(`${cloudinaryUrl}`, {
        method: "POST",
        body: formData,
      });

      const data: CloudinaryResponse = await res.json();

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      setIsUploading(false);

      return data.secure_url;
    } catch (error) {
      setIsUploading(false);
      toast.error("Cloudinary upload failed");
      throw error;
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    let uploadedImageUrl = image;

    if (data.imageFile) {
      try {
        uploadedImageUrl = await uploadImageToCloudinary(data.imageFile);
      } catch (error) {
        return;
      }
    }

    const updateData = {
      name: data.name,
      bio: data.bio,
      country: data.country,
      address: data.address,
      image: uploadedImageUrl,
    };

    try {
      const res = await updateMyProfileFn({
        data: updateData,
        id: userId,
      }).unwrap();

      if (res?.success) {
        toast.success("Profile updated successfully!");
        onOpenChange();
        reset(updateData); // Reset form to updated values
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <>
      <Button
        className="w-full primary-button"
        startContent={<FaUser />}
        onPress={onOpen}
      >
        Edit Profile
      </Button>
      <Modal
        className="m-2"
        isOpen={isOpen}
        placement="center"
        size="md"
        onOpenChange={onOpenChange}
      >
        {(isLoading || isUploading) && <GlassLoader />}
        <ModalContent className="m-2">
          <ModalHeader>
            <h1 className="text-xl font-bold text-pink-500">Update Profile</h1>
          </ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center">
                  {image && (
                    <Image
                      alt="Image Preview"
                      className="w-24 h-24 object-cover rounded-full mt-2"
                      height={500}
                      src={image}
                      width={500}
                    />
                  )}
                </div>
                <Input
                  type="text"
                  {...register("name")}
                  className="bg-opacity-0"
                  label="Name"
                  placeholder="Enter your name"
                  variant="flat"
                />
                <Input
                  type="text"
                  {...register("bio")}
                  className="bg-opacity-0"
                  label="Bio"
                  placeholder="Enter your bio"
                  variant="flat"
                />
                <Input
                  type="text"
                  {...register("address")}
                  className="bg-opacity-0"
                  label="Address"
                  placeholder="Enter your address"
                  variant="flat"
                />
                <Input
                  type="text"
                  {...register("country")}
                  className="bg-opacity-0"
                  label="Country"
                  placeholder="Enter your country"
                  variant="flat"
                />
                <div className="">
                  <label
                    className="border border-default-100 border-dashed rounded-md flex items-center justify-center py-2 cursor-pointer w-full"
                    htmlFor="image"
                  >
                    <IoIosImages
                      className="text-pink-500 cursor-pointer mr-2"
                      size={32}
                    />
                    Upload Photo
                  </label>
                  <input
                    accept="image/*"
                    className="hidden"
                    id="image"
                    type="file"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex items-center gap-8">
              <Button
                className="primary-button"
                isDisabled={!isDirty}
                type="submit"
              >
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
