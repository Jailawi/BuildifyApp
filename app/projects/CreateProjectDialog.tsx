import React, { useEffect, useState } from "react";
import { Button, Callout, Dialog, Text, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import axios from "axios";
import classNames from "classnames";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";


interface Props {
  NewProjectButton: any;
  setReload: any;
  setCurrentProject: any;
  setOpenDropMenu: any;
}

interface ProjectForm {
  name: string;
}

const CreateProjectDialog = ({
  NewProjectButton,
  setReload,
  setCurrentProject,
  setOpenDropMenu,
}: Props) => {
  const { register, handleSubmit, formState, reset } = useForm<ProjectForm>({
    defaultValues: {
      name: "",
    },
  });
  const [error, setError] = useState<any>("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>{NewProjectButton}</Dialog.Trigger>

      <Dialog.Content
        style={{ maxWidth: 450 }}
        onInteractOutside={() => {
          // router.push("/projects");
          reset();
        }}
      >
        <div>
          <Dialog.Title>Create New Project</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Give your project a name. Then click on create.
          </Dialog.Description>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Input
              autoComplete="off"
              placeholder="Enter project name"
              {...register("name", { required: true, maxLength: 255 })}
            />
          </label>

          {error && (
            <Callout.Root color="red" size={"1"}>
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>
                {error.message}
                <span className="italic">{error.highlight}</span>
                {error.rest}
              </Callout.Text>
            </Callout.Root>
          )}
          <form
            className="space-x-3 mt-4 flex justify-end"
            onSubmit={handleSubmit(async (data) => {
              try {
                const response = await axios.post("/api/projects", data);
                const project = response.data;
                router.push(`/projects/${project.id}`);
                setCurrentProject(project.name);
                setOpen(false);
                setOpenDropMenu(false);
              } catch (error) {
                console.log("data error: ", data);
                setError({
                  message: "Project with name ",
                  highlight: data.name,
                  rest: " already exists.",
                });
              }
              reset();
              setReload(true);
            })}
          >
            <Dialog.Close>
              <Button
                variant="soft"
                color="gray"
                type="button"
                onClick={() => {
                  // router.push("/projects");
                  setOpenDropMenu(false);
                  setError("");
                  reset();
                }}
              >
                Cancel
              </Button>
            </Dialog.Close>

            <Button
              color="green"
              className={classNames({
                "hover:outline hover:outline-2 hover:outline-green-300":
                  !formState.isValid,
                "transition-all ease-in delay-0": true,
              })}
              type="submit"
              disabled={!formState.isValid}
            >
              Create Project
            </Button>
          </form>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CreateProjectDialog;
