import "../../css/loading-spinner.css";

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
