import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ContactPage() {
  const contacts = [
    {
      name: "Gargee Dhalkari",
      position: "Head, Start-Up Internship Program",
      phone: "+91 84597 87655",
      email: "dhalkarigp23@iitk.ac.in",
    },
    {
      name: "Anuj Agrawal",
      position: "Overall Coordinator",
      phone: "+91 70000 54528",
      email: "anujag23@iitk.ac.in",
    },
    {
      name: "Aryan Mittal",
      position: "Overall Coordinator",
      phone: "+91 85956 89515",
      email: "amittal23@iitk.ac.in",
    },
    {
      name: "Abhay Saxena",
      position: "Head, Web Development",
      phone: "+91 93015 68760",
      email: "abhaysa23@iitk.ac.in",
    },
  ]

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-emerald-800 mb-4">Contact Us</h1>
          <p className="text-emerald-600 max-w-2xl mx-auto">
            Have questions or need assistance? Our team is here to help. Reach out to the appropriate department below.
          </p>
        </div>

        <Card className="border-emerald-200 shadow-md">
          <CardHeader className="bg-emerald-50 border-b border-emerald-100">
            <CardTitle className="text-emerald-800">Our Team</CardTitle>
            <CardDescription className="text-emerald-600">
              Connect with our leadership and department heads
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-emerald-50">
                <TableRow className="hover:bg-emerald-50/50">
                  <TableHead className="text-emerald-700">Name</TableHead>
                  <TableHead className="text-emerald-700">Position</TableHead>
                  <TableHead className="text-emerald-700">Phone</TableHead>
                  <TableHead className="text-emerald-700">Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact, index) => (
                  <TableRow
                    key={index}
                    className={`hover:bg-emerald-50/50 ${index % 2 === 0 ? "bg-white" : "bg-emerald-50/30"}`}
                  >
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell>{contact.position}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell className="text-emerald-600 underline">{contact.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="mt-10 text-center">
          <p className="text-emerald-700 mb-2">General Inquiries</p>
          <p className="text-emerald-600 font-medium">ecell@iitk.ac.in | +91 70000 54528</p>
          <p className="text-emerald-700 mt-4 mb-2">Office Hours</p>
          <p className="text-emerald-600">Monday - Friday: Morning to Evening</p>
        </div>
      </div>
    </div>
  )
}
