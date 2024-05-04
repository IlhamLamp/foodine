"use client";
import CheckoutPriceSummary from "@/components/Checkout/CheckoutPriceSummary";
import CheckoutProductDetails from "@/components/Checkout/CheckoutProductDetails";
import CheckoutProfileAddress from "@/components/Checkout/CheckoutProfileAddress";

const CheckoutPage: React.FC = () => {

    return (
        <section id="checkout" className="mt-20 mx-auto bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col gap-4">
                    <CheckoutProfileAddress />
                    <CheckoutProductDetails />
                    <CheckoutPriceSummary />
                </div>
            </div>
        </section>
    )
}

export default CheckoutPage;