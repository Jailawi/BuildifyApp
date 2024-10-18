"use client";
import React, { useState } from "react";
import { DatePicker } from "../../DatePicker";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@radix-ui/themes";
import TipTap from "./TipTap";
import classNames from "classnames";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

interface ActivityForm {
    title: string;
    description: any;
    date: string;
}

const NewActivity = () => {
    const params = useParams();
    const router = useRouter();
    const [date, setDate] = useState<Date>(new Date());
    const { register, handleSubmit, formState, control } =
        useForm<ActivityForm>({
            defaultValues: {
                date: new Date().toISOString().split("T")[0],
            },
        });

    return (
        <form
            onSubmit={handleSubmit(async (data) => {
                const date = data.date.split("T")[0];
                data.date = date;
                let postData = { ...data, projectId: params.id };
                const response = await axios.post(
                    `/api/projects/${params.id}/new-activity`,
                    postData
                );
                router.push(`/projects/${params.id}`);
                router.refresh();
            })}
            className="flex items-center justify-center"
        >
            <div className="block w-[900px] space-y-2 ">
                <div className="block w-full">
                    <div className="flex justify-between items-center w-full">
                        <h1 className="font-medium text-xl">
                            Create an activity
                        </h1>
                        <div>
                            <Controller
                                name="date"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <DatePicker
                                        date={date}
                                        setDate={setDate}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <hr className="mt-2 h-[1px] border-none bg-zinc-800" />
                </div>
                <div className="w-full space-y-2">
                    <label htmlFor="" className="block w-full">
                        <input
                            {...register("title", {
                                required: true,
                                maxLength: 255,
                            })}
                            className="prose dark:prose-invert lead min-w-full border focus:outline-none focus:border-white border-zinc-800 w-full rounded-md bg-neutral-900 px-3 py-1.5"
                            type="text"
                            placeholder="Title"
                        />
                    </label>
                </div>
                <div>
                    <Controller
                        name="description"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TipTap
                                description={""}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </div>
                <div className="block w-full">
                    <Button type="button" variant="surface">
                        Previous
                    </Button>
                    <hr className="my-3 h-[1px] border-none bg-zinc-800" />
                    <div className="w-full flex justify-end">
                        <Button
                            type="submit"
                            variant="solid"
                            radius="medium"
                            className={classNames({
                                "hover:outline hover:outline-2 hover:outline-[#FFCA16]":
                                    !formState.isValid,
                                "transition-all ease-in delay-0": true,
                            })}
                            disabled={!formState.isValid}
                        >
                            Post
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default NewActivity;
