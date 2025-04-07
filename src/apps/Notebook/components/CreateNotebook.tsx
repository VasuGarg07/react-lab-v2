import { useForm } from "react-hook-form";
import { z } from "zod";
import UploadImage from "@/components/UploadImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastService } from "@/shared/toastr";
import { createNotebook } from "../helpers/notebookApi";
import { CreateNotebookRequest } from "../helpers/notebook.constants";
import Dialog from "@/ui/Dialog";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const schema = z.object({
    title: z.string().min(1, "Title is required"),
    visibility: z.enum(["public", "private"]),
    coverImageUrl: z.string().optional(),
    password: z.string().optional(),
}).refine(
    (data) => data.visibility === "public" || (data.password && data.password.length >= 4),
    {
        message: "Password is required and must be at least 4 characters",
        path: ["password"],
    }
);

const CreateNotebook: React.FC<Props> = ({ isOpen, onSuccess, onClose }) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<CreateNotebookRequest>({
        resolver: zodResolver(schema),
        defaultValues: { visibility: "public" }
    });

    const coverImage = watch("coverImageUrl");
    const visibility = watch("visibility");

    const submit = async (data: CreateNotebookRequest) => {
        try {
            await createNotebook(data);
            toastService.success("Notebook created");
            onSuccess?.();
        } catch (err: any) {
            toastService.error(err?.response?.data?.error || "Failed to create notebook");
        }
    };

    return (
        <Dialog isOpen={isOpen} onClose={onClose} title="Create Notebook" size="sm" contentClassName='mb-4'>
            <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4 p-4 dark:text-neutral-100">
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        {...register("title")}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-gray-900"
                    />
                    {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Cover Image</label>
                    <UploadImage
                        imageUrl={coverImage}
                        onUpload={(url) => setValue("coverImageUrl", url)}
                        onRemove={() => setValue("coverImageUrl", "")}
                        width={300}
                        height={160}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Visibility</label>
                    <select
                        {...register("visibility")}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-gray-900"
                    >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                </div>

                {visibility === "private" && (
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            {...register("password")}
                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-gray-900"
                        />
                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    </div>
                )}

                <div className="pt-2 flex justify-end">
                    <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm">
                        Create
                    </button>
                </div>
            </form>
        </Dialog>
    );
};

export default CreateNotebook;
