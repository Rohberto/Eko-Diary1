import "./styles/globals.scss";
import { ReduxProvider } from "./redux-provider";
import Header from "./Components/Header";
import "./polyfill";
import {GoogleOAuthProvider} from "@react-oauth/google";
import { DataProvider } from "./Context/datacontext";

export const metadata = {
metadataBase: new URL("https://www.ekodiary.com"),
keywords: ["ekodiary", "eko diary", "events", "ticketing", "event ticketing", "event ticketing in lagos"],
title: {
  default: "Eko Diary",
  template: "%s | ekodiary"
},
description: "Eko Diary is an innovative event ticketing platform in Lagos designed to provide a seamless and eco-friendly experience for event organizers and attendees alike.",
openGraph: {
description: "Eko Diary is an innovative event ticketing platform in Lagos designed to provide a seamless and eco-friendly experience for event organizers and attendees alike. With a focus on sustainability, Eko-Diary offers a digital-first approach, eliminating the need for paper tickets and supporting environmentally-conscious events.",
title: "Eko Diary  - Event Ticketing website in Lagos.",
url: 'https://www.ekodiary.com',
siteName: "Eko Diary",
type: 'website',
images: [
  {
    url: "https://firebasestorage.googleapis.com/v0/b/eko-diary-cc1f6.appspot.com/o/Images%2Fundefined%20%20%20%20%20%20%201%2C725%2C890%2C410%2C396?alt=media&amp;token=4b5fa4e3-bce2-474d-88c6-f6197b40e072",
    width: 1200,
    heigth: 630,
    alt: 'Preview Image For Eko Diary'
  }
]
},
twitter: {
  card: 'summary_large_image',
  description: "Eko Diary is an innovative event ticketing platform in Lagos designed to provide a seamless and eco-friendly experience for event organizers and attendees alike. With a focus on sustainability, Eko-Diary offers a digital-first approach, eliminating the need for paper tickets and supporting environmentally-conscious events.",
title: "Eko Diary  - Event Ticketing website in Lagos.",
images: [
  {
    url: "https://firebasestorage.googleapis.com/v0/b/eko-diary-cc1f6.appspot.com/o/Images%2Fundefined%20%20%20%20%20%20%201%2C725%2C890%2C410%2C396?alt=media&amp;token=4b5fa4e3-bce2-474d-88c6-f6197b40e072", 
    alt: 'Preview Image For Eko Diary'
  }
]
}
};
export const runtime = "edge";
export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <div className="root">
        <ReduxProvider>
    <DataProvider>
      <GoogleOAuthProvider clientId='791231017716-jl6nmsaou4kbgphsr6fftvaur8av5j99.apps.googleusercontent.com'>
        <Header/>
          {children}
          </GoogleOAuthProvider>
        </DataProvider>
        </ReduxProvider>
        </div>
      </body>
    </html>
  );
}
