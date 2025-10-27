import fa from "@/messages/fa.json";
import en from "@/messages/en.json";
import ru from "@/messages/ru.json";
import es from "@/messages/es.json";
import fr from "@/messages/fr.json";
import de from "@/messages/de.json";
import tr from "@/messages/tr.json";
import ar from "@/messages/ar.json";
import zh from "@/messages/zh.json";
import ja from "@/messages/ja.json";
import ko from "@/messages/ko.json";

const dict: Record<string, any> = { fa, en, ru, es, fr, de, tr, ar, zh, ja, ko };

export async function getMessages(locale: string) {
  return dict[locale] || fa;
}
