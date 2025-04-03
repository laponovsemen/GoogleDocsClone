import { FullScreenLoader } from '@/components/shared/full-screen-loader';


function LoadingPage() {
    return (
        <FullScreenLoader
            label='Document loading...'
        />

    );
}

export default LoadingPage;