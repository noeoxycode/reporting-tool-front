'use client';

import React, {useTransition} from 'react';
import {useRouter} from 'next/navigation';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {Goal, GoalCreateInput} from "@/lib/types/goal";
import {COLORS} from "@/app/theme";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {toast, Toaster} from "sonner";

interface GoalFormProps {
    initialData?: Goal;
    onSubmit: (data: GoalCreateInput) => Promise<void>;
    buttonText: string;
}

export default function GoalForm({initialData, onSubmit, buttonText}: GoalFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        control,
        formState: {errors}
    } = useForm<GoalCreateInput>({
        defaultValues: {
            name: initialData?.name || '',
            type: initialData?.type || '',
            startDate: initialData?.startDate || '',
            targetDate: initialData?.targetDate || '',
            amount: initialData?.amount || 0,
            priority: initialData?.priority || 'Medium',
            image: initialData?.image || null,
            activeStatus: initialData?.activeStatus || 'Active',
            adviceStatus: initialData?.adviceStatus || 'Needed',
        }
    });

    const handleFormSubmit: SubmitHandler<GoalCreateInput> = async (data) => {
        startTransition(async () => {
            try {
                await onSubmit(data);
                toast.success(
                    initialData ? "Goal updated successfully" : "Goal created successfully",
                );
                router.refresh(); // Refresh the current route
            } catch (error) {
                toast.error(
                    error instanceof Error ? error.message : "An error occurred",
                );
            }
        });
    };

    const goalTypes = [
        {value: "Retirement", label: "Retirement"},
        {value: "Education", label: "Education"},
        {value: "House", label: "House"},
        {value: "Car", label: "Car"},
        {value: "Vacation", label: "Vacation"},
        {value: "Other", label: "Other"},
    ];

    const priorities = [
        {value: "High", label: "High"},
        {value: "Medium", label: "Medium"},
        {value: "Low", label: "Low"},
    ];

    const activeStatuses = [
        {value: "Active", label: "Active"},
        {value: "Inactive", label: "Inactive"},
        {value: "On Hold", label: "On Hold"},
    ];

    const adviceStatuses = [
        {value: "Needed", label: "Needed"},
        {value: "Requested", label: "Requested"},
        {value: "In Progress", label: "In Progress"},
        {value: "Received", label: "Received"},
    ];

    // Define reusable class names
    const labelClass = `block text-sm font-medium ${COLORS.text} mb-2`;
    const errorClass = `text-sm text-red-500 mt-1`;

    return (
        <Card className="w-full shadow-md">
            <Toaster richColors position="top-right" />
            <CardHeader>
                <CardTitle className="text-xl font-bold">
                    {initialData ? "Edit Goal" : "Create New Goal"}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Goal Name Field */}
                        <div className="md:col-span-2">
                            <label htmlFor="name" className={labelClass}>Goal Name</label>
                            <Input
                                id="name"
                                {...register("name", {required: "Goal name is required"})}
                                className={`w-full px-3 py-2 border ${COLORS.border} rounded-md shadow-sm focus:outline-none ${COLORS.focus}`}
                            />
                            {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                        </div>

                        {/* Goal Type Field */}
                        <div>
                            <label htmlFor="type" className={labelClass}>Goal Type</label>
                            <Controller
                                name="type"
                                control={control}
                                rules={{required: "Goal type is required"}}
                                render={({field}) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger
                                            className={`w-full px-3 py-2 border ${COLORS.border} rounded-md shadow-sm focus:outline-none ${COLORS.focus}`}>
                                            <SelectValue placeholder="Select type"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {goalTypes.map((type) => (
                                                <SelectItem key={type.value} value={type.value}>
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.type && <p className={errorClass}>{errors.type.message}</p>}
                        </div>

                        {/* Amount Field */}
                        <div>
                            <label htmlFor="amount" className={labelClass}>Target Amount ($)</label>
                            <Input
                                id="amount"
                                type="number"
                                {...register("amount", {
                                    required: "Amount is required",
                                    min: {value: 0, message: "Amount must be positive"}
                                })}
                                min="0"
                                step="0.01"
                                className={`w-full px-3 py-2 border ${COLORS.border} rounded-md shadow-sm focus:outline-none ${COLORS.focus}`}
                            />
                            {errors.amount && <p className={errorClass}>{errors.amount.message}</p>}
                        </div>

                        {/* Start Date Field */}
                        <div>
                            <label htmlFor="startDate" className={labelClass}>Start Date</label>
                            <Input
                                id="startDate"
                                type="date"
                                {...register("startDate", {required: "Start date is required"})}
                                className={`w-full px-3 py-2 border ${COLORS.border} rounded-md shadow-sm focus:outline-none ${COLORS.focus}`}
                            />
                            {errors.startDate && <p className={errorClass}>{errors.startDate.message}</p>}
                        </div>

                        {/* Target Date Field */}
                        <div>
                            <label htmlFor="targetDate" className={labelClass}>Target Date</label>
                            <Input
                                id="targetDate"
                                type="date"
                                {...register("targetDate", {required: "Target date is required"})}
                                className={`w-full px-3 py-2 border ${COLORS.border} rounded-md shadow-sm focus:outline-none ${COLORS.focus}`}
                            />
                            {errors.targetDate && <p className={errorClass}>{errors.targetDate.message}</p>}
                        </div>

                        {/* Priority Field */}
                        <div>
                            <label htmlFor="priority" className={labelClass}>Priority</label>
                            <Controller
                                name="priority"
                                control={control}
                                render={({field}) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger
                                            className={`w-full px-3 py-2 border ${COLORS.border} rounded-md shadow-sm focus:outline-none ${COLORS.focus}`}>
                                            <SelectValue placeholder="Select priority"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {priorities.map((priority) => (
                                                <SelectItem key={priority.value} value={priority.value}>
                                                    {priority.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.priority && <p className={errorClass}>{errors.priority.message}</p>}
                        </div>

                        {/* Active Status Field */}
                        <div>
                            <label htmlFor="activeStatus" className={labelClass}>Active Status</label>
                            <Controller
                                name="activeStatus"
                                control={control}
                                render={({field}) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger
                                            className={`w-full px-3 py-2 border ${COLORS.border} rounded-md shadow-sm focus:outline-none ${COLORS.focus}`}>
                                            <SelectValue placeholder="Select status"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {activeStatuses.map((status) => (
                                                <SelectItem key={status.value} value={status.value}>
                                                    {status.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.activeStatus && <p className={errorClass}>{errors.activeStatus.message}</p>}
                        </div>

                        {/* Advice Status Field */}
                        <div>
                            <label htmlFor="adviceStatus" className={labelClass}>Advice Status</label>
                            <Controller
                                name="adviceStatus"
                                control={control}
                                render={({field}) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger
                                            className={`w-full px-3 py-2 border ${COLORS.border} rounded-md shadow-sm focus:outline-none ${COLORS.focus}`}>
                                            <SelectValue placeholder="Select advice status"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {adviceStatuses.map((status) => (
                                                <SelectItem key={status.value} value={status.value}>
                                                    {status.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.adviceStatus && <p className={errorClass}>{errors.adviceStatus.message}</p>}
                        </div>
                    </div>

                    <CardFooter className="flex justify-end px-0 pt-4">
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="bg-primary hover:bg-primary/90"
                        >
                            {isPending ? "Processing..." : buttonText}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
}
