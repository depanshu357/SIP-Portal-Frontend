import React from 'react'

type Props = {}

const InternPolicy = (props: Props) => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-emerald-600">StartUp Internship Program - Internship Policy</h1>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">General Guidelines</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            The policy applies to all students registering for SIP Internship season 2018-19 and remains applicable throughout the season.
          </li>
          <li>
            At registration, students must specify their preference for:
            <ul className="list-disc list-inside ml-4">
              <li>Corporate Internship</li>
              <li>Academic Internship</li>
            </ul>
          </li>
          <li>
            A student who has accepted an internship cannot apply to another unless all registered students have been offered internships.
          </li>
          <li>
            Results announced within a day (12:00 a.m. - 11:59 p.m.) fall under the same-day policy, allowing students to choose one offer if multiple are received.
          </li>
          <li>
            A student must accept an offer by the end of the day if it's the only one received; otherwise, their account will be deactivated.
          </li>
          <li>
            Rejected offers create opportunities for waitlisted candidates unless their selection is confirmed by SIP.
          </li>
          <li>
            If a student secures an internship outside SIP, they must inform the Head, SIP, within 24 hours via email.
          </li>
          <li>
            Once an internship is accepted under SIP or SPO, the student is de-registered from both programs.
          </li>
        </ol>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Student Conduct & Disciplinary Actions</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Students cannot withdraw a job application without a valid reason.</li>
          <li>Contacting a registered company directly is considered an off-campus attempt and is discouraged.</li>
          <li>Direct interaction with company officials before interviews is prohibited.</li>
          <li>Cheating or malpractice during selection processes will result in immediate disqualification.</li>
          <li>Mobile phones are not allowed during any internship-related activities.</li>
          <li>Providing false claims on resumes will lead to offer revocation and disciplinary action.</li>
          <li>Any violations will be reported to the institute authorities.</li>
          <li>The SIP disciplinary committee handles all disciplinary decisions, with an appeal process available.</li>
        </ul>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-2">Defaulter Policy</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Second-year defaulters may be banned from SIP in their third year or fined INR 5,000.</li>
          <li>Third-year and above defaulters may be fined INR 10,000.</li>
          <li>First-year defaulters may be banned from SIP in the following years.</li>
          <li>Postgraduate defaulters may be fined INR 10,000.</li>
          <li>Failure to pay fines results in registration bans for the next semester.</li>
        </ul>
      </section>
    </div>
  )
}

export default InternPolicy