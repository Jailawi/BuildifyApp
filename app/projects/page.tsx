'use client'
import React from "react";
import { Button, Select } from "@radix-ui/themes";
import Link from "next/link";
import dynamic from "next/dynamic";

const CreateProjectDialog = dynamic(() => import("./CreateProjectDialog"), {
  ssr: false,
});

const ProjectPage = () => {
  return (
    <>
      {/* <CreateProjectDialog
        NewProjectButton={
          <Link href="/projects/?new=true">
            <Button >New Project</Button>
          </Link>
        }
      ></CreateProjectDialog> */}
    </>
  );
};

export default ProjectPage;
