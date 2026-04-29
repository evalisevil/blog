'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { type BasicSetting } from '@prisma/client'
import {
  Copyright,
  FileText,
  FolderPen,
  Headset,
  Image,
  Loader2,
  Mail,
  MapPin,
  Megaphone,
  Phone,
  Printer,
  Share2,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { FaSquareThreads } from 'react-icons/fa6'

import { CallOut, FilePicker } from '@/shared/ui'
import { ButtonGroup } from '@/shared/ui/buttons'
import { CardContainer, CardSubContent, CardTitleWithIcon } from '@/shared/ui/card'
import { Button } from '@/shared/ui/shadcn/button'
import { Card, CardContent, CardFooter } from '@/shared/ui/shadcn/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/shadcn/form'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/ui/shadcn/input-group'

import { type BasicFormValuesType, basicSchema } from '../model/basic-schema'

export const BasicForm = ({ basicData }: { basicData: BasicSetting }) => {
  const form = useForm<BasicFormValuesType>({
    defaultValues: basicData,
    mode: 'onTouched',
    resolver: zodResolver(basicSchema),
  })

  const { clearErrors, formState, handleSubmit, setError, register, reset, control } = form

  const onSubmit = handleSubmit(async (values) => {
    console.log('values', values)
    clearErrors('root')
    // mutate(values)
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <CardContainer>
          {/* 사이트 정보 */}
          <Card>
            <CardTitleWithIcon
              description="사이트의 기본 정보를 설정합니다."
              icon={FolderPen}
              title="기본 정보"
            />

            <CardContent>
              <CardSubContent title="기본 정보">
                <FormField
                  control={control}
                  name="siteName"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel required>사이트명</FormLabel>
                      <FormControl>
                        <InputGroup>
                          <InputGroupInput {...field} placeholder="주식회사 어드미니스트레이터" />
                          <InputGroupAddon>
                            <FolderPen />
                          </InputGroupAddon>
                        </InputGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="representativeEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>대표 이메일</FormLabel>
                      <FormControl>
                        <InputGroup>
                          <InputGroupInput
                            {...field}
                            placeholder="example@example.com"
                            type="email"
                          />
                          <InputGroupAddon>
                            <Mail />
                          </InputGroupAddon>
                        </InputGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="representativeTel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>대표 연락처</FormLabel>
                      <FormControl>
                        <InputGroup>
                          <InputGroupInput {...field} placeholder="02-123-4567" type="tel" />
                          <InputGroupAddon>
                            <Phone />
                          </InputGroupAddon>
                        </InputGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="fax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>팩스</FormLabel>
                      <FormControl>
                        <InputGroup>
                          <InputGroupInput {...field} placeholder="02-123-4567" type="tel" />
                          <InputGroupAddon>
                            <Printer />
                          </InputGroupAddon>
                        </InputGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="customerTel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>고객 지원 연락처</FormLabel>
                      <FormControl>
                        <InputGroup>
                          <InputGroupInput {...field} placeholder="02-123-4567" type="tel" />
                          <InputGroupAddon>
                            <Headset />
                          </InputGroupAddon>
                        </InputGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>주소</FormLabel>
                      <FormControl>
                        <InputGroup>
                          <InputGroupInput {...field} placeholder="서울특별시 중구 을지로 100" />
                          <InputGroupAddon>
                            <MapPin />
                          </InputGroupAddon>
                        </InputGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardSubContent>

              <CardSubContent title="사업자 정보">
                <FormField
                  control={control}
                  name="representativeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>대표자명</FormLabel>
                      <FormControl>
                        <InputGroup>
                          <InputGroupInput {...field} placeholder="홍길동" />
                          <InputGroupAddon>
                            <User />
                          </InputGroupAddon>
                        </InputGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="businessNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>사업자 번호</FormLabel>
                      <FormControl>
                        <InputGroup>
                          <InputGroupInput {...field} placeholder="123-45-67890" />
                          <InputGroupAddon>
                            <FileText />
                          </InputGroupAddon>
                        </InputGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="salesRegistrationNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>통신판매 신고 번호</FormLabel>
                      <FormControl>
                        <InputGroup>
                          <InputGroupInput {...field} placeholder="123-45-67890" />
                          <InputGroupAddon>
                            <Megaphone />
                          </InputGroupAddon>
                        </InputGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="copyright"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>저작권 연도</FormLabel>
                      <FormControl>
                        <InputGroup>
                          <InputGroupInput
                            {...field}
                            placeholder="2026 주식회사 어드미니스트레이터"
                          />
                          <InputGroupAddon>
                            <Copyright />
                          </InputGroupAddon>
                        </InputGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardSubContent>
            </CardContent>

            <CardFooter>
              <CallOut
                description="정확한 정보 입력은 신뢰도 향상에 도움이 됩니다."
                icon={ShieldCheck}
                title="입력하신 정보는 사이트 하단, 문의 페이지, 메타 정보 등에 활용됩니다."
              />
            </CardFooter>
          </Card>

          {/* SNS 및 외부 링크 */}
          <Card>
            <CardTitleWithIcon
              description="SNS 및 외부 링크를 설정합니다."
              icon={Share2}
              title="SNS 및 외부 링크"
            />

            <CardContent>
              <FormField
                control={control}
                name="linkedIn"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormControl>
                      <InputGroup>
                        <InputGroupInput {...field} placeholder="https://www.linkedin.com/..." />
                        <InputGroupAddon>
                          <FaLinkedin color="#0a66c2" />
                          <FormLabel className="w-18">LinkedIn</FormLabel>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="instagram"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormControl>
                      <InputGroup>
                        <InputGroupInput {...field} placeholder="https://www.instagram.com/..." />
                        <InputGroupAddon>
                          <FaInstagram color="#E1306C" />
                          <FormLabel className="w-18">Instagram</FormLabel>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="youtube"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormControl>
                      <InputGroup>
                        <InputGroupInput {...field} placeholder="https://www.youtube.com/..." />
                        <InputGroupAddon>
                          <FaYoutube color="#FF0000" />
                          <FormLabel className="w-18">Youtube</FormLabel>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="threads"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormControl>
                      <InputGroup>
                        <InputGroupInput {...field} placeholder="https://www.threads.com/..." />
                        <InputGroupAddon>
                          <FaSquareThreads color="#000000" />
                          <FormLabel className="w-18">Threads</FormLabel>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="facebook"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormControl>
                      <InputGroup>
                        <InputGroupInput {...field} placeholder="https://www.facebook.com/..." />
                        <InputGroupAddon>
                          <FaFacebook color="#1877F2" />
                          <FormLabel className="w-18">Facebook</FormLabel>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="github"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormControl>
                      <InputGroup>
                        <InputGroupInput {...field} placeholder="https://www.github.com/..." />
                        <InputGroupAddon>
                          <FaGithub color="#181717" />
                          <FormLabel className="w-18">Github</FormLabel>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter>
              <CallOut
                icon={Sparkles}
                title="활성화된 링크는 사이트의 푸터 및 관련 페이지에 표시됩니다."
              />
            </CardFooter>
          </Card>

          {/* 로고 & 파비콘 */}
          <Card>
            <CardTitleWithIcon
              description="로고 & 파비콘을 설정합니다."
              icon={Image}
              title="로고 & 파비콘"
            />

            <CardContent>
              <FormField
                control={control}
                name="logo"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-sm font-medium">기본 로고</FormLabel>
                    <FormControl>
                      <FilePicker allowedFormat="PNG / SVG / WEBP" maxSize="1MB" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="logo"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-sm font-medium">화이트 로고</FormLabel>
                    <FormControl>
                      <FilePicker allowedFormat="PNG / SVG / WEBP" maxSize="1MB" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="logo"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-sm font-medium">파비콘</FormLabel>
                    <FormControl>
                      <FilePicker allowedFormat="PNG / SVG / WEBP" maxSize="1MB" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </CardContainer>

        <ButtonGroup>
          <Button type="submit">
            {formState.isSubmitting ? <Loader2 className="size-4 animate-spin" /> : '저장'}
          </Button>
        </ButtonGroup>
      </form>
    </Form>
  )
}
