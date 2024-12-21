import { Card, CardBody, Button, Image } from "@nextui-org/react";
import { Icon } from '@iconify/react';
import { QRCodeSVG } from 'qrcode.react';

const WeddingFooter = () => {
    return (
        <footer className="w-full font-khmer mb-16">
            <div className="max-w-6xl mx-auto px-4">
                {/* Decorative Header */}
                <div className="flex justify-center item-center">
                    <Image src="/images/crown-01.png" className="mb-4 h-10" />
                </div>
                <div className="flex items-center justify-center mb-8">
                    <div className="h-[1px] flex-1 bg-rose-200"></div>
                    <Icon
                        icon="mdi:heart"
                        className="w-6 h-6 mx-4 text-rose-400"
                    />
                    <div className="h-[1px] flex-1 bg-rose-200"></div>
                </div>

                <div className="grid grid-cols-1 gap-12">
                    {/* QR Code RSVP */}
                    <div className="space-y-4 text-center">
                        <h3 className="text-2xl font-semibold text-gray-800">ការឆ្លើយតប</h3>
                        <p className="text-gray-600">ស្កេនដើម្បីបញ្ជាក់ការចូលរួមរបស់អ្នក</p>
                        <Card className="max-w-[200px] mx-auto bg-white/50 border border-rose-100">
                            <CardBody>
                                <QRCodeSVG value="https://example.com/contact" size={150} className="w-full h-full object-cover" />
                            </CardBody>
                        </Card>
                    </div>

                    {/* Contact Items */}
                    <div className="w-full">
                        {/* Phone 1 */}
                        <div className="group hover:bg-rose-50/50 rounded-lg transition-all duration-300">
                            <div className="flex items-center justify-center">
                                <div className="flex flex-col">
                                    <span className="text-sm text-rose-400 text-center">លេខទំនាក់ទំនង</span>
                                    <span className="text-gray-700 font-medium">សារ៉ា៖ +៨៥៥ ១២ ៣៤៥ ៦៧៨</span>
                                </div>
                            </div>
                        </div>

                        {/* Phone 2 */}
                        <div className="group hover:bg-rose-50/50 rounded-lg transition-all duration-300">
                            <div className="flex justify-center items-center">
                                <div className="flex flex-col">
                                    <span className="text-gray-700 font-medium">មីកែល៖ +៨៥៥ ១២ ៩៨៧ ៦៥៤</span>
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="group hover:bg-rose-50/50 p-3 rounded-lg transition-all duration-300">
                            <div className="flex justify-center items-center gap-3">
                                <div className="flex flex-col">
                                    <span className="text-sm text-rose-400 text-center">អ៊ីមែល</span>
                                    <span className="text-gray-700 font-medium break-all">wedding@sarahandmichael.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gift Registry */}
                <div className="mt-4 text-center">
                    <Button
                        className="bg-rose-400 text-white font-khmer"
                        size="lg"
                        endContent={<Icon icon="mdi:gift" className="w-5 h-5" />}
                    >
                        មើលបញ្ជីអំណោយ
                    </Button>
                </div>

                {/* Decorative Footer */}
                <div className="flex items-center justify-center mt-12">
                    <div className="h-[1px] flex-1 bg-rose-200"></div>
                    <div className="px-4">
                        <span className="text-2xl font-dancing text-rose-400">សារ៉ានិងមីកែល</span>
                    </div>
                    <div className="h-[1px] flex-1 bg-rose-200"></div>
                </div>

                {/* Closing Message */}
                <div className="mt-2 text-center text-gray-600">
                    <p>
                        <Icon
                            icon="mdi:cards-heart"
                            className="w-5 h-5 inline mr-2 text-rose-400"
                        />
                        យើងរង់ចាំអបអរសាទរជាមួយអ្នក!
                    </p>
                </div>
                {/* Social Media Icons */}
                <div className="flex justify-center gap-4 mt-4">
                    <Icon
                        icon="mdi:instagram"
                        className="w-6 h-6 text-rose-400 cursor-pointer hover:text-rose-500"
                    />
                    <Icon
                        icon="mdi:facebook"
                        className="w-6 h-6 text-rose-400 cursor-pointer hover:text-rose-500"
                    />
                    <Icon
                        icon="mdi:pinterest"
                        className="w-6 h-6 text-rose-400 cursor-pointer hover:text-rose-500"
                    />
                </div>
            </div>
        </footer>
    );
};

export default WeddingFooter;