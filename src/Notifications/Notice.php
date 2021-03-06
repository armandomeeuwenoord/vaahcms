<?php

namespace WebReinvent\VaahCms\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class Notice extends Notification
{
    use Queueable;
    public $notify;
    public $params;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(\WebReinvent\VaahCms\Entities\Notification $notification, $params )
    {
        $this->notify = $notification;
        $this->params = $params;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {

        $contents = $this->notify->contents()
            ->where('via', 'mail')
            ->orderBy('sort', 'asc')
            ->get();


        $mail = (new MailMessage);


        if($this->notify->is_error)
        {
            $mail->error();
        }

        if($contents)
        {
            foreach ($contents as $content)
            {


                $translated = vh_translate_dynamic_strings($content->value, $this->params);
                switch ($content->key)
                {
                    case 'subject':
                        $mail->subject($translated);
                        break;

                    case 'greetings':
                        echo "<pre>";
                        $mail->greeting($translated);
                        break;

                    case 'from':
                        $mail->from($content->value, $content->meta->name);
                        break;

                    case 'action':
                        $translated = vh_translate_dynamic_strings($content->meta->action, $this->params);
                        $mail->action($content->value, $translated);
                        break;

                    default:
                        $mail->line($translated);
                        break;
                }
            }
        }

        return $mail;

    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
        ];
    }
}
