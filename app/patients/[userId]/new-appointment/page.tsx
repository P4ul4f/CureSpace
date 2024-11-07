import * as Sentry from "@sentry/nextjs";
import Image from "next/image";
import Link from "next/link";

import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";




const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  Sentry.metrics.set("user_view_new-appointment", patient.name);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Link href="/" className="cursor-pointer">
            <div className="flex gap-4">
              <Image
                src="/assets/images/logom.png"
                height={1000}
                width={1000}
                alt="patient"
                className="mb-12 h-10 w-fit"
              />
              <span className="text-white md:text-4xl sm:text-2xl font-bold">
                CureSpace
              </span>
            </div>
          </Link>

          <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type="create"
          />

          <p className="copyright mt-10 py-12">© 2024 CureSpace</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default Appointment;
