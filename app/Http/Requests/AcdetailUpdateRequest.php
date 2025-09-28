<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AcdetailUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'present' => ['nullable', 'string', 'max:3000'],
            'photo' => ['nullable', 'image', 'mimes:jpeg,jpg,png', 'max:1024'],
            'linkedin' => ['nullable', 'string', 'regex:/^https:\/\/(www\.)?linkedin\.com\/.*$/i'],
            'facebook' => ['nullable', 'string', 'regex:/^https:\/\/(www\.)?facebook\.com\/.*$/i'],
            'instagram' => ['nullable', 'string', 'regex:/^https:\/\/(www\.)?instagram\.com\/.*$/i'],
            'x' => ['nullable', 'string', 'regex:/^https:\/\/(www\.)?x\.com\/.*$/i'],
            'website' => ['nullable', 'string', 'regex:/^https:\/\/.+$/i'],
        ];
    }

    public function messages(): array
    {
        return [
            'present'     => 'The bio must be only text.',
            'present'        => 'maximum 3000 characters.',
            'photo'        => 'Must be image.',
            'photo'        => 'Accepted Formats : jpeg, jpg, png.',
            'photo'          => 'maximum 2 Mo.',
            'linkedin'     => 'Enter valid LinkedIn (https://linkedin.com/...).',
            'facebook'     => 'Enter valid Facebook (https://facebook.com/...).',
            'instagram'    => 'Enter valid Instagram (https://instagram.com/...).',
            'x'            => 'Enter valid X (https://x.com/...).',
            'website'        => 'Enter valid secure website URL (https://....).',
        ];
    }
}
