import { ActionIcon, Box, Group, Image, Text, rem } from "@mantine/core";
import { BsImage, BsUpload } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import styles from "./components.module.scss";
import { FC } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { useUploadImg } from "hooks/useUpload";

interface PropsType {
  image: string;
  setImage: (image: string) => void;
}

const ImageUpload: FC<PropsType> = ({ image, setImage }) => {
  const { run: upload } = useUploadImg((res) => {
    setImage(res.url);
  });

  const handleDrop = (files: FileWithPath[]) => {
    const file = files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          upload(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImg = () => setImage("");

  return image ? (
    <Box className={styles.imageBox}>
      <Image src={image} />
      <Box className={styles.layer}>
        <ActionIcon
          color="red"
          radius="md"
          size="xl"
          className={styles.deleteBtn}
          onClick={handleDeleteImg}
        >
          <BsFillTrashFill size={20} />
        </ActionIcon>
      </Box>
    </Box>
  ) : (
    <Dropzone
      className={styles.dropZone}
      onDrop={handleDrop}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
    >
      <Group
        justify="center"
        gap="xl"
        mih={220}
        style={{ pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <BsUpload
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-blue-6)",
            }}
          />
        </Dropzone.Accept>

        <Dropzone.Reject>
          <ImCross
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-red-6)",
            }}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <BsImage
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-dimmed)",
            }}
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
};

export default ImageUpload;
