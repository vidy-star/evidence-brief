import type { SupportedFileType } from "@/types/evidence";
import {
  FileText,
  FileImage,
  FileType,
  type LucideIcon,
} from "lucide-react";

export function getFileTypeIcon(type: SupportedFileType): LucideIcon {
  switch (type) {
    case "pdf":
      return FileText;
    case "jpg":
    case "png":
      return FileImage;
    case "docx":
      return FileType;
    default:
      return FileText;
  }
}

export function getFileTypeBadgeColor(type: SupportedFileType): string {
  switch (type) {
    case "pdf":
      return "bg-red-50 text-red-700 ring-red-600/20";
    case "jpg":
    case "png":
      return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
    case "docx":
      return "bg-blue-50 text-blue-700 ring-blue-600/20";
    default:
      return "bg-gray-50 text-gray-700 ring-gray-600/20";
  }
}
