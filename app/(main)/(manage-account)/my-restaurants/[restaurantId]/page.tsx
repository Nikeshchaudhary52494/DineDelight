interface PageProps {
    params: {
        restaurantId: string;
    };
}

export default function Page({ params }: PageProps) {
    return (
        <div>
            {params.restaurantId}
        </div>
    )
}