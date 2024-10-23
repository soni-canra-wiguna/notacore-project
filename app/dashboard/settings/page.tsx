import { ContactDeveloper } from "@/components/dashboard/settings/contact-developer"
import { DeteleAccount } from "@/components/dashboard/settings/delete-account"
import { SectionSettingLayout } from "@/components/dashboard/settings/section-setting-layout"
import { MainContainer } from "@/components/layout/main-container"
import { Wrapper } from "@/components/layout/wrapper"
import { auth } from "@clerk/nextjs/server"

const SettingsPage = async () => {
  const { userId, getToken } = auth()
  const token = await getToken()

  return (
    <MainContainer>
      <Wrapper className="my-20">
        <SectionSettingLayout title="akun" className="mb-8">
          <DeteleAccount token={token ?? ""} userId={userId ?? ""} />
        </SectionSettingLayout>
        <SectionSettingLayout title="kontak developer">
          <ContactDeveloper />
        </SectionSettingLayout>
      </Wrapper>
    </MainContainer>
  )
}

export default SettingsPage
