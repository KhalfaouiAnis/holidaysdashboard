import { ReactNode } from "react";
import { authLayoutLabels } from "../_components/formLabels";
import Image from "next/image";
import { LanguageSwitcher } from "../../dashboard/_components/sidebar/language-switcher";

export default async function Layout({ children }: Readonly<{ children: ReactNode }>) {
    const authLabels = await authLayoutLabels()

    return (
        <div className="flex h-dvh">
            <div className="bg-primary hidden lg:block lg:w-1/3">
                <div className="flex h-full flex-col items-center justify-center p-12 text-center">
                    <div className="space-y-8">
                        <div className="w-2xs md:mb-20">
                            <Image alt="Holidays" src='/avatars/logo.png' width={300} height={300} priority />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-primary-foreground text-4xl font-light">{authLabels["title"]}</h1>
                            <p className="text-primary-foreground/80 text-xl">{authLabels["subTitle"]}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-background flex w-full items-center justify-center p-8 lg:w-2/3">
                <div className="w-full max-w-md space-y-10 py-24 lg:py-32">
                    {children}
                    <div className="flex items-center justify-center">
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>
        </div>
    )

}