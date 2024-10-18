"use client";
import { Button, Table } from "@radix-ui/themes";
import Link from "../../components/Link";
import { DatePicker } from "../DatePicker";
import delay from "delay";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

interface Props {
    params: {
        id: string;
    };
}

interface DateForm {
    date: string;
}

interface Activity {
    activityId: string;
    title: string;
    content: string;
    updatedAt: string;
}

const ProjectHomePage = ({ params: { id } }: Props) => {
    const [date, setDate] = useState<Date>(new Date());
    const [activities, setActivities] = useState<Activity[]>([]);
    const { control } = useForm<DateForm>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`/api/projects/${id}`, {
                    date: date.toISOString().split("T")[0],
                });
                const data = response.data;
                console.log("date: ", date.toISOString().split("T")[0]);
                setActivities(data);
            } catch (error) {
                console.log("error: ", error);
            }
        };
        fetchData();
    }, [date]);

    return (
        <div className="grid place-items-center h-36">
            <div className="flex w-2/3  items-center justify-between py-3">
                <Button variant="surface">
                    <Link href={`${id}/new-activity`}>Create new activity</Link>
                </Button>
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

            <div className="w-2/3 border border-neutral-800 rounded-md p-5">
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>
                                Activity
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                                Content
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                                Last Update
                            </Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {activities.reverse().map((activity) => (
                            <Table.Row
                                className="hover:bg-neutral-800"
                                key={activity.activityId}
                            >
                                <Table.Cell>
                                    <Link href={"/"}>{activity.title}</Link>
                                </Table.Cell>

                                <Table.Cell>{"Example Text"}</Table.Cell>
                                <Table.Cell>
                                    {new Date(
                                        activity.updatedAt
                                    ).toDateString()}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>

                {/* <div className="flex justify-center w-full h-full">
                        <h1 className="left-64">No activities found</h1>
                    </div> */}
            </div>
        </div>
    );
};

export default ProjectHomePage;
