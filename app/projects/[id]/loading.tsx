import { Button, Table } from "@radix-ui/themes";
import Link from "@/app/components/Link";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingActivityPage = () => {
    const activities = [1, 2, 3, 4, 5];
    return (
        <div className="grid place-items-center h-36">
            <Button variant="surface" m="5">
                <Link href={`/`}>Create new activity</Link>
            </Button>

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
                                Created
                            </Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {activities.reverse().map((activity) => (
                            <Table.Row key={activity}>
                                <Table.Cell>
                                    <Skeleton width={357} height={20} />
                                </Table.Cell>
                                <Table.Cell>
                                    <Skeleton width={357} height={20} />
                                </Table.Cell>
                                <Table.Cell>
                                    <Skeleton width={357} height={20} />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </div>
        </div>
    );
};

export default LoadingActivityPage;
