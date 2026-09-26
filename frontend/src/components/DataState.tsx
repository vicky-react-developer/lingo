import { Loader2 } from "lucide-react"

export default function DataState({ loading }: {loading: boolean}) {
    return (
        <div className="flex justify-center">
            {loading ?
                <Loader2 className="animate-spin" />
                :
                <div> No Data found!</div>
            }
        </div>
    )
}