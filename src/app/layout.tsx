import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Self-Improvement Library',
    template: '%s | Self-Improvement',
  },
  description:
    '个人成长与学习资源收集项目 - 收录优质书籍摘录、学习笔记和个人成长内容',
  keywords: [
    'Self-Improvement',
    '个人成长',
    '学习资源',
    '读书笔记',
    'Project Hail Mary',
    '科幻小说',
    '知识管理',
  ],
  authors: [{ name: 'Self-Improvement Project' }],
  generator: 'Next.js',
  openGraph: {
    title: 'Self-Improvement Library',
    description:
      '个人成长与学习资源收集项目 - 收录优质书籍摘录、学习笔记和个人成长内容',
    type: 'website',
    locale: 'zh_CN',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="en">
      <body className={`antialiased`}>
        {isDev && <Inspector />}
        {children}
      </body>
    </html>
  );
}
