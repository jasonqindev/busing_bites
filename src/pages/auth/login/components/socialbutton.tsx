import { Button, ButtonProps } from "@mantine/core";

type SocialButtonProps = {
    icon: React.ReactNode;
} & ButtonProps & React.ComponentPropsWithoutRef<'button'>

const SocialButton = ({ icon, ...props }: SocialButtonProps) => {
    return (
        <Button leftSection={icon} variant="default" {...props} />
    )
}

export default SocialButton;