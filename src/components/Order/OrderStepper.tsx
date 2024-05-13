import { Step, Stepper } from "react-form-stepper";

const OrderStepper: React.FC<{ status: string }> = ({ status }) => {
    return (
        <div className="mb-8 w-full bg-white rounded-lg shadow-lg">
            <Stepper
                activeStep={status === 'settlement' ? 2 : 0 } 
                connectorStateColors={true} 
                connectorStyleConfig={{ completedColor: '#50CB93', activeColor: '#71EFA3', disabledColor: '#F0F3FF', size: 3, style: 'solid'}}
                styleConfig={{ 
                    completedBgColor: '#50CB93', activeBgColor: '#71EFA3', inactiveBgColor: '#F0F3FF',
                    completedTextColor: '#F0F3FF', activeTextColor: '#F0F3FF', inactiveTextColor: '#3D5656',
                    borderRadius: '100%', circleFontSize: 20, fontWeight: 600, labelFontSize: 12, size: 30
                }}
            >
                <Step label="ORDER CONFIRMED" />
                <Step label= "PAYMENT CONFIRMED" />
                <Step label="PACKED" />
                <Step label="SHIPPED" />
                <Step label="DELIVERED" />
            </Stepper>
        </div>
    )
}

export default OrderStepper;