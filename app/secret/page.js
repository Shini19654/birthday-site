"use client";
import { CONFIG } from "../../config";
import PasscodeSecret from "../../components/PasscodeSecret";
import BackButton from "../../components/BackButton";

export default function Secret() {
    return (
        <main
            className="fixed inset-0 flex items-center justify-center"
            style={{ background: "linear-gradient(180deg, #FFE0E8 0%, #FFD6E3 60%, #FFE0E8 100%)" }}
        >
            <PasscodeSecret
                correctCode={CONFIG.passcode}
                message={CONFIG.passcodeSecret}
            />
            <BackButton />
        </main>
    );
}
