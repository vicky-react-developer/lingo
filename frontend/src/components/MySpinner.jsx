export default function MySpinner({ loading }) {
    return (
        <div className="text-center">
            {loading ?
                <div className="spinner-border text-primary"></div>
                :
                <div> No Data found!</div>
            }
        </div>
    )
}