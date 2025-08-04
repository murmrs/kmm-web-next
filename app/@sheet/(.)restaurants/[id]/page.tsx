import PageSheet from "@/components/page-sheet";
import Details from "@/components/restaurants/details";
import { fetchRestaurant } from "@/lib/data";

const RestaurantModal = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await params;
  const data = await fetchRestaurant(id);
  return (
    <PageSheet hideCloseButton={true}>
      <Details
        className="overflow-y-auto"
        location={data || undefined}
        displayBackButton={true}
      />
    </PageSheet>
  );
};

export default RestaurantModal;
