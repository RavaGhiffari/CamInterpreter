import { useEffect, useRef, useState } from "react"

export default function CamStart() {
    const [webcam, setWebcam] = useState(false)

    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (!webcam) return

        let stream: MediaStream

        const startCamera = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                })

                if (videoRef.current) {
                    videoRef.current.srcObject = stream
                }
            } catch (error) {
                console.error("Camera error:", error)
                setWebcam(false)
            }
        }

        startCamera()

        return () => {
            stream?.getTracks().forEach((track) => track.stop())

            if (videoRef.current) {
                videoRef.current.srcObject = null
            }
        }
    }, [webcam])

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            {webcam && (
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-screen  scale-x-[-1]"
                />
            )}

            <button
                onClick={() => setWebcam((prev) => !prev)}
                className={`
                    px-4 py-2  text-white rounded
                    transition-all duration-100 ease-in-out
                    ${
                        webcam
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-blue-500 hover:bg-blue-600"
                    }
                `}
            >
                <span
                    className={`
                        inline-block w-3 h-3 mr-2
                        bg-white transition-transform duration-300
                        ${webcam ? "" : "rounded-full"}
                    `}
                />

                {webcam ? "Stop Camera" : "Start Camera"}
            </button>
        </div>
    )
}