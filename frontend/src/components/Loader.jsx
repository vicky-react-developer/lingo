import { Loader } from "lucide-react";

export default function MyLoader({ size = 24 }) {
    return (
        <Loader size={size} className="animate-spin inline ml-2" />
    )
}