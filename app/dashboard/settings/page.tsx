import { DeteleAccount } from "@/components/dashboard/settings/delete-account"
import { MainContainer } from "@/components/layout/main-container"
import { Container } from "@/components/layout/container"
import { auth } from "@clerk/nextjs/server"

export default async function SettingsPage() {
  const { userId, getToken } = auth()
  const token = await getToken()

  return (
    <MainContainer>
      <Container className="my-20">
        <section className="space-y-4">
          <h1 className="text-lg font-bold capitalize">Pengaturan</h1>
          <div>
            <DeteleAccount token={token ?? ""} userId={userId ?? ""} />
          </div>
        </section>
      </Container>
    </MainContainer>
  )
}
