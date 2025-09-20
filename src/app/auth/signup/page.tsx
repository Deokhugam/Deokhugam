'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupFormData } from '@/lib/authSchema';
import { useAuthStore } from '@/store/authStore';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  
  const { signup, isLoading, error, clearError } = useAuthStore();
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const emailValue = watch('email') || '';
  const nicknameValue = watch('nickname') || '';
  const passwordValue = watch('password') || '';
  const confirmPasswordValue = watch('confirmPassword') || '';

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup(data.email, data.nickname, data.password);
      router.push('/auth/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-0 flex items-center justify-center p-4">
      <div className="w-full max-w-[400px]">
        {/* 제목 섹션 */}
        <div className="mb-8 text-center">
          <h1 className="text-header1 font-bold text-[#181D27] mb-[10px]">
            만나서 반갑습니다!
          </h1>
          <p className="text-body2 font-medium text-gray-500">
            가입을 위해 정보를 입력해주세요
          </p>
        </div>

               {/* 폼 섹션 */}
               <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mb-6">
                 <div>
                   <Input
                     type="email"
                     label="이메일"
                     placeholder="이메일을 입력해주세요"
                     value={emailValue}
                     onChange={(e) => {
                       register('email').onChange(e);
                     }}
                     onBlur={(e) => {
                       register('email').onBlur(e);
                     }}
                     name={register('email').name}
                     ref={register('email').ref}
                     error={errors.email?.message}
                   />
                 </div>

                 <div>
                   <Input
                     type="text"
                     label="닉네임"
                     placeholder="닉네임을 입력해주세요"
                     value={nicknameValue}
                     onChange={(e) => {
                       register('nickname').onChange(e);
                     }}
                     onBlur={(e) => {
                       register('nickname').onBlur(e);
                     }}
                     name={register('nickname').name}
                     ref={register('nickname').ref}
                     error={errors.nickname?.message}
                   />
                 </div>

                 <div>
                   <Input
                     type={isPasswordVisible ? "text" : "password"}
                     label="비밀번호"
                     placeholder="비밀번호를 입력해주세요"
                     showPasswordToggle={true}
                     onTogglePassword={togglePasswordVisibility}
                     isPasswordVisible={isPasswordVisible}
                     value={passwordValue}
                     onChange={(e) => {
                       register('password').onChange(e);
                     }}
                     onBlur={(e) => {
                       register('password').onBlur(e);
                     }}
                     name={register('password').name}
                     ref={register('password').ref}
                     error={errors.password?.message}
                   />
                 </div>

                 <div>
                   <Input
                     type={isConfirmPasswordVisible ? "text" : "password"}
                     label="비밀번호 확인"
                     placeholder="한 번 더 입력해주세요"
                     showPasswordToggle={true}
                     onTogglePassword={toggleConfirmPasswordVisibility}
                     isPasswordVisible={isConfirmPasswordVisible}
                     value={confirmPasswordValue}
                     onChange={(e) => {
                       register('confirmPassword').onChange(e);
                     }}
                     onBlur={(e) => {
                       register('confirmPassword').onBlur(e);
                     }}
                     name={register('confirmPassword').name}
                     ref={register('confirmPassword').ref}
                     error={errors.confirmPassword?.message}
                   />
                 </div>

                 <Button
                   type="submit"
                   variant="primary"
                   className="w-full mt-1"
                   disabled={!isValid || isSubmitting || isLoading}
                 >
                   {isSubmitting || isLoading ? '가입 중...' : '가입하기'}
                 </Button>
               </form>

    {/* 에러 메시지 */}
    {error && (
      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-body3 font-medium text-red-600 text-center">{error}</p>
      </div>
    )}

        <div className="flex items-center justify-center gap-1">
          <span className="text-body3 font-medium text-gray-500">
            계정이 있으신가요?
          </span>
          <Link 
            href="/auth/login" 
            className="text-body3 font-semibold text-gray-700 underline decoration-solid"
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
