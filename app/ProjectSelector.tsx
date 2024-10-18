import { CaretDownIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdFolderCopy } from "react-icons/Md";
import CreateProjectDialog from "./projects/CreateProjectDialog";
import { usePathname, useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";

interface Project {
    id: string;
    name: string;
}

const ProjectSelector = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentProject, setCurrentProject] = useState("");
    const [reload, setReload] = useState(false);
    const [open, setOpenDropMenu] = useState(false);
    const router = useRouter();
    const usePathName = usePathname();

    // const projects = await prisma.project.findMany();

    const getProjectName = (id: any, projects: any) => {
        const project = projects.filter((project: any) => {
            if (project.id === id) {
                return project.name;
            }
        });
        if (project[0]) {
            return project[0].name;
        }
        return "";
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/projects");
                const data = response.data;
                setProjects(data);
                const currentProjectName = getProjectName(
                    usePathName.split("projects/")[1].split('/')[0],
                    data
                );
                setCurrentProject(currentProjectName);
                if (!currentProjectName) {
                    const project = getCookie("project") as string;
                    setCurrentProject(project);
                }
            } catch (error) {
                console.log("error: ", error);
            }
        };
        fetchData();
        setReload(false);
    }, [reload]);

    return (
        <DropdownMenu.Root open={open} onOpenChange={setOpenDropMenu}>
            <DropdownMenu.Trigger className="flex justify-start outline-none outline-offset-0">
                <button className="flex justify-start p-1 pl-3 pr-3 items-center text-[#DDC797] font-medium bg-[#30210F] rounded-md space-x-16 hover:outline-3 hover:outline-[#FFC53D]">
                    <MdFolderCopy className="mr-1 text-[#DDC797]" />
                    {currentProject}
                    <CaretDownIcon className="font-medium" />
                </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="w-64">
                {projects.map((project: Project) => (
                    <div key={project.name} className="flex items-center">
                        {project.name === currentProject && (
                            <div className="bg-[#977A17] w-2 h-6 rounded-md ml-[-10px]" />
                        )}
                        <DropdownMenu.Item
                            key={project.name}
                            color={
                                currentProject !== project.name
                                    ? "gray"
                                    : "amber"
                            }
                            onSelect={(e) => {
                                setCurrentProject(project.name);
                                setCookie("project", project.name);
                                router.push(`/projects/${project.id}`);
                            }}
                            className="w-full"
                        >
                            {project.name}
                        </DropdownMenu.Item>
                    </div>
                ))}
                <DropdownMenu.Separator />
                <CreateProjectDialog
                    NewProjectButton={
                        <button className="w-full px-3 h-8 items-center rounded-md flex justify-start text-sm text-[#46fea5d4] hover:bg-[#30a46c] hover:text-white">
                            <svg
                                className="mr-1"
                                width="18"
                                height="18"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            Create New Project
                        </button>
                    }
                    setReload={setReload}
                    setCurrentProject={setCurrentProject}
                    setOpenDropMenu={setOpenDropMenu}
                />
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export default ProjectSelector;
